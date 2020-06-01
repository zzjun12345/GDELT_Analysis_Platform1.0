from __future__ import print_function
import pandas as pd
from collections import defaultdict
import math

# c=2
# m2= [[0 for i in range(3)] for i in range(3)] 
# m3=[[]]
# m3.append([1,1,1])
# m3.append([1,1,1,1])
# m3.append([1,2,3])
# m3.append([1,2,3,4])  
# m2[1][1]=m2[1][1]+1
# print(m2)
# print(m3[3][2])
# time=[0,1,2,3,4,5,6]
# cal=0
# for t in time:
#     if t!=4:
#         cal=cal+t
#     else:
#         cal=cal+0
# print(cal)
filePath="F:/大三下课件/地信网络实习/result/"
resultPath="F:/大三下课件/地信网络实习/statisticresult/"
filename = "ans424copy1.csv"
dataRead = pd.read_csv(filePath+filename)
dataRead.columns = ['GlobaleventID', 'day','Actor1Country','Actor2Country','ActionCountry',
                    'eventcode','eventrootcode','AvgTone','quadclass','GoldsteinScale',
                    'attitude','influence','isinfluential','ActionLat','ActionLon']
dataFilter = dataRead[['GlobaleventID','day','Actor1Country','Actor2Country','ActionCountry','eventcode','eventrootcode','AvgTone','quadclass','GoldsteinScale','attitude','influence','isinfluential','ActionLat','ActionLon']]

def calculate(datafil,dicFile):
    n=0
    for indexs in datafil.index:
        if n<20000:
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
            isinfluential = datafil.loc[indexs].values[12]
            ActionLat = datafil.loc[indexs].values[13]
            ActionLon = datafil.loc[indexs].values[14]

            char1=str(Globaleventid)+','+str(date)+','+str(Actor1Country)+','+str(Actor2Country)+','+str(Actioncountry)+','+str(eventcode)+','+str(eventrootcode)+','+str(avgtone)+','+str(quadclass)+','+str(goldsteinscale)+','+str(attitude)+','+str(influence)+','+str(isinfluential)+','+str(ActionLat)+','+str(ActionLon)
            print(char1,file=dicFile)
            n=n+1
        #在此写指数计算过程，把数据按时间分类，不太容易
        else:
            break

dicfile = open(filePath + 'ans' + '20000.csv', 'w')
print('GlobaleventID'',''day'',''Actor1Country'',''Actor2Country'',''ActionCountry'',''eventcode'',''eventrootcode'',''AvgTone'',''quadclass'',''goldsteinscale'',''attitude'',''influence'',''isinfluential'',''ActionLat'',''ActionLon',file=dicfile)
calculate(dataFilter,dicfile)
dicfile.close()
