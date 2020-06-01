#用以统计生成表格中各个属性单元的分类个数，难度在于分天统计
from __future__ import print_function
import pandas as pd
from collections import defaultdict
import math

filePath="F:/大三下课件/地信网络实习/newresult/"
resultPath="F:/大三下课件/地信网络实习/newstatisticresult/"
filename = "ansGDELTm5.csv"
dataRead = pd.read_csv(filePath+filename)
dataRead.columns = ['GlobaleventID', 'day','Actor1Country','Actor2Country','ActionCountry',
                    'eventcode','eventrootcode','AvgTone','quadclass','GoldsteinScale',
                    'attitude','influence','isinfluential','ActionLat','ActionLon'
                    ]
dataFilter1 = dataRead[['day','Actor1Country','Actor2Country','ActionCountry','AvgTone','quadclass','GoldsteinScale','influence']]
dataFilter1 = dataFilter1.dropna()  # 去掉有空值的行
dataFilter1 = dataFilter1.reset_index(drop=True)  # 重新设置索引
dataFilter2 = dataRead[['day','Actor1Country','Actor2Country']]
dataFilter2 = dataFilter2.dropna()  # 去掉有空值的行
dataFilter2 = dataFilter2.reset_index(drop=True)  # 重新设置索引
countrynum = defaultdict(int)#此两个仅统计次数
relationnum = defaultdict(int)#
countryindex = defaultdict(list)
relationindex =defaultdict(list)
#日期的数量是不是很重要？以后每日一更，日期20200310年月日
def calculate1(datafil):
    for indexs in datafil.index:
        # Globaleventid = datafil.loc[indexs].values[0]
        date = datafil.loc[indexs].values[0]
        Actor1Country = datafil.loc[indexs].values[1]
        Actor2Country = datafil.loc[indexs].values[2]
        # Actioncountry = datafil.loc[indexs].values[4]
        # eventcode = datafil.loc[indexs].values[5]
        # eventrootcode = datafil.loc[indexs].values[6]
        # avgtone = datafil.loc[indexs].values[7]
        # quadclass = datafil.loc[indexs].values[8]
        # goldsteinscale = datafil.loc[indexs].values[9]
        # attitude = datafil.loc[indexs].values[10]
        # influence = datafil.loc[indexs].values[11]
        # influencial = datafil.loc[indexs].values[12]
        # ActionLat = datafil.loc[indexs].values[13]
        # ActionLon = datafil.loc[indexs].values[14]
        #在此写指数计算过程，把数据按时间分类
        #国家节点统计
        #国家关系边统计
        if Actor1Country != Actor2Country:
            countrynum[date,Actor1Country] += 1  
            countrynum[date,Actor2Country] += 1 
            if (date,Actor2Country, Actor1Country) in relationnum.keys():
                relationnum[date,Actor2Country,Actor1Country] += 1
            else:
                relationnum[date,Actor1Country,Actor2Country] += 1

def calculate2(datafil):
    for indexs in datafil.index:
        # Globaleventid = datafil.loc[indexs].values[0]
        date = datafil.loc[indexs].values[0]
        Actor1Country = datafil.loc[indexs].values[1]
        Actor2Country = datafil.loc[indexs].values[2]
        Actioncountry = datafil.loc[indexs].values[3]
        # eventcode = datafil.loc[indexs].values[5]
        # eventrootcode = datafil.loc[indexs].values[6]
        avgtone = datafil.loc[indexs].values[4]
        quadclass = datafil.loc[indexs].values[5]
        goldsteinscale = datafil.loc[indexs].values[6]
        # attitude = datafil.loc[indexs].values[10]
        influence = datafil.loc[indexs].values[7]
        # influencial = datafil.loc[indexs].values[12]
        # ActionLat = datafil.loc[indexs].values[13]
        # ActionLon = datafil.loc[indexs].values[14]
        if Actor1Country != Actor2Country:
            if (date,Actor1Country) in countryindex.keys():
                a = countryindex[date,Actor1Country][0] 
                b = countryindex[date,Actor1Country][1]  
                a += 1
                b += influence*goldsteinscale
                countryindex[date,Actor1Country] = [a,b]
            else:
                countryindex[date,Actor1Country] = [0.0,0.0]
                a = 1
                b = influence*goldsteinscale
                countryindex[date,Actor1Country] = [a,b]

            if (date,Actor2Country) in countryindex.keys():
                c = countryindex[date,Actor1Country][0] 
                d = countryindex[date,Actor1Country][1]  
                c += 1
                d += influence*goldsteinscale
                countryindex[date,Actor2Country] = [c,d]
            else:
                countryindex[date,Actor2Country] = [0.0,0.0] 
                c = 1
                d = influence*goldsteinscale
                countryindex[date,Actor1Country] = [c,d]

            if (date,Actor2Country, Actor1Country) in relationindex.keys():
                e=relationindex[date,Actor2Country,Actor1Country][0]
                f=relationindex[date,Actor2Country,Actor1Country][1]
                e += 1
                f += influence*goldsteinscale
                relationindex[date,Actor2Country,Actor1Country] = [e,f]
            elif (date,Actor1Country, Actor2Country) in relationindex.keys():
                g=relationindex[date,Actor1Country,Actor2Country][0]
                h=relationindex[date,Actor1Country,Actor2Country][1]
                g += 1
                h += influence*goldsteinscale
                relationindex[date,Actor1Country,Actor2Country] = [g,h]
            else:
                relationindex[date,Actor1Country,Actor2Country] = [0.0,0.0]
                g = 1
                h = influence*goldsteinscale
                relationindex[date,Actor1Country,Actor2Country] = [g,h]

calculate1(dataFilter2)
calculate2(dataFilter1)
# def calmean(dic):
#     dic[]
for  keys in countryindex.keys():
    a=countryindex[keys[0],keys[1]][0]
    if a==0:
        a=1
    b=countryindex[keys[0],keys[1]][1]
    c = b/a
    countryindex[keys[0],keys[1]]=[a,b,c]

for  keys in relationindex.keys():
    a=relationindex[keys[0],keys[1],keys[2]][0]
    if a==0:
        a=1
    b=relationindex[keys[0],keys[1],keys[2]][1]
    c=b/a
    relationindex[keys[0],keys[1],keys[2]] = [a,b,c]

dicfile = open(resultPath + 'countrybasic.csv', 'a')
# print('date'',''country'',''number', file=dicfile)
for dic, numCount in countrynum.items():
    text1=str(dic[0])+','+str(dic[1])+','+str(numCount)
    print(text1, file=dicfile)
dicfile.close()

dicfile = open(resultPath + 'relationbasic.csv', 'a')
# print('date'',''country1'',''country2'',''number', file=dicfile)
for dic, numCount in relationnum.items():
    text2=str(dic[0])+','+str(dic[1])+','+str(dic[2])+','+str(numCount)
    print(text2, file=dicfile)
dicfile.close()

dicfile = open(resultPath + 'countryindex.csv', 'a')
# print('date'',''country'',''num'',''index'',''avgindex', file=dicfile)
for dic, numCount in countryindex.items():
    text3=str(dic[0])+','+str(dic[1])+','+str(numCount[0])+','+str(numCount[1])+','+str(numCount[2])
    print(text3, file=dicfile)
dicfile.close()

dicfile = open(resultPath + 'relationindex.csv', 'a')
# print('date'',''country1'',''country2'',''num'',''index'',''avgindex', file=dicfile)
for dic, numCount in relationindex.items():
    text4=str(dic[0])+','+str(dic[1])+','+str(dic[2])+','+str(numCount[0])+','+str(numCount[1])+','+str(numCount[2])
    print(text4, file=dicfile)
dicfile.close()