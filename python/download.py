#-*-coding:utf-8-*-
import requests
from bs4 import BeautifulSoup
import datetime, time
import zipfile
import sys
import multiprocessing
import random
import os

path = sys.path[0] +'/'

def get_url_list(url):
    '''获取页面下的所有url，保存到url_list.txt中，并返回url_list'''
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'lxml')
    url_list = []
    for li in soup.body.ul.find_all('li'):
        href = 'http://data.gdeltproject.org/events/' + li.a['href']
        url_list.append(href)
    # print len(url_list)
    new_url_list = url_list[3:-1] #前三个url和最后一个不是我们需要的数据，故跳过
    f = open(path + 'url_list.txt', 'w')
    for url in new_url_list:
        f.write(url)
        f.write('\n')
    return new_url_list

def get_url_data(url):
    filename = path + url.split('/')[-1]
    try:
        data = requests.get(url)
        t = random.random()
        #因为文件较多，所以选择随机输出url，便于掌握运行情况
        if t > 0.5:
            print (url)
        with open(filename, "wb") as code:
            code.write(data.content)
            print(url+"download_success")
        fz = zipfile.ZipFile(filename, 'r')
        fz.extract(fz.namelist()[0], path) #解压下载下来的zip文件夹
        if os.path.exists(filename):
            os.remove(filename) #删除zip文件夹，只保存解压后的数据
            print(url+"success")
    except Exception as e:
        # print Exception, e
        log = open(path + 'log.txt', 'a')
        log.write(url)
        log.write('\n')
    time.sleep(3)

if __name__ == '__main__':
    stime = datetime.datetime.now()
    print (stime)
    url = 'http://data.gdeltproject.org/events/index.html'
    url_list = get_url_list(url)
    url_newest=url_list[0]
    get_url_data(url_newest)
    url_want = url_list[1:7]#选择需要的文件
    pool = multiprocessing.Pool() #开启进程池，使用多进程提高下载速度
    pool.map(get_url_data, url_want)
    etime = datetime.datetime.now()
    print (etime)
    print (etime - stime)

