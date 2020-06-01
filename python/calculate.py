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
dataFilter = dataRead[['GlobaleventID','day','Actor1Country','Actor2Country','ActionCountry','eventcode','eventrootcode','AvgTone','quadclass','GoldsteinScale','attitude','influence','isinfluential','ActionLat','ActionLon']]
# dataFilter = dataFilter.dropna()  # 去掉有空值的行
# dataFilter = dataFilter.reset_index(drop=True)  # 重新设置索引

# influencecal=[[0 for i in range(5)] for i in range()]
# attutudecal= [[0 for i in range(5)] for i in range()] #用于储存每日的atttitude统计数据0到4依次为最差到最好
time=[]#提前定义好内部的元素
influencecal1=[]
attutudecal1=[]#两数组动态增加数量内部元素为[时间,类别1,类别2，……]
influencecal2=defaultdict(int) #目录和值的设置，default可以新建
attitudecal2=defaultdict(int) 
quadcal=defaultdict(int) 
eventtype=defaultdict(int) 
# countryindex = defaultdict(list)
# relationindex = defaultdict(list)#
#日期的数量是不是很重要？以后每日一更，日期20200310年月日
def calculate(datafil):
    for indexs in datafil.index:
        Globaleventid = datafil.loc[indexs].values[0]
        date = datafil.loc[indexs].values[1]
        Actor1Country = datafil.loc[indexs].values[2]
        Actor2Country = datafil.loc[indexs].values[3]
        Actioncountry = datafil.loc[indexs].values[4]
        eventcode = datafil.loc[indexs].values[5]
        eventrootcode = datafil.loc[indexs].values[6]
        avgtone = datafil.loc[indexs].values[7]
        quadclass = datafil.loc[indexs].values[8]
        goldsteinscale = datafil.loc[indexs].values[9]
        attitude = datafil.loc[indexs].values[10]
        influence = datafil.loc[indexs].values[11]
        influencial = datafil.loc[indexs].values[12]
        ActionLat = datafil.loc[indexs].values[13]
        ActionLon = datafil.loc[indexs].values[14]
        #在此写指数计算过程，把数据按时间分类
        #事件指标统计
        attitudecal2[date,attitude] += 1#态度
        quadcal[date,quadclass] += 1
        eventtype[date,eventrootcode] += 1
        if influence>8:
            influencecal2[date,"influential"] += 1#影响力
        elif influence>4:
            influencecal2[date,"common"] += 1
        else:
            influencecal2[date,"littleinfluential"] += 1
        #类别

        #国家节点统计
        #国家关系边统计
        # if Actor1Country!=null
        # if Actor1Country != Actor2Country: 

calculate(dataFilter)

dicfile = open(resultPath + 'influence.csv', 'a')
# print('date'',''type'',''number', file=dicfile)
for dic, numCount in influencecal2.items():
    text1=str(dic[0])+','+str(dic[1])+','+str(numCount)
    print(text1, file=dicfile)
dicfile.close()

dicfile = open(resultPath + 'quad.csv', 'a')
# print('date'',''quadclass'',''number', file=dicfile)
for dic, numCount in quadcal.items():
    text2=str(dic[0])+','+str(dic[1])+','+str(numCount)
    print(text2, file=dicfile)
dicfile.close()

dicfile = open(resultPath + 'attitude.csv', 'a')
# print('date'',''type'',''number', file=dicfile)
for dic, numCount in attitudecal2.items():
    text3=str(dic[0])+','+str(dic[1])+','+str(numCount)
    print(text3, file=dicfile)
dicfile.close()

dicfile = open(resultPath + 'event.csv', 'a')
# print('date'',''eventcode'',''number', file=dicfile)
for dic, numCount in eventtype.items():
    text4=str(dic[0])+','+str(dic[1])+','+str(numCount)
    print(text4, file=dicfile)
dicfile.close()
# def position():
#     count=0
#         for t in time:
#             if t!=date:
#                 count=count+1 
#             else:
#                 break


