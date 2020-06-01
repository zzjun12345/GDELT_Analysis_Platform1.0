from __future__ import print_function
import pandas as pd
from collections import defaultdict
import math
filePath = "F:/大三下课件/地信网络实习/data/"  # 数据存放路径
resultPath="F:/大三下课件/地信网络实习/result/"

filename = "GDELTfull1.csv"
dataRead = pd.read_csv(filePath+filename)
dataRead.columns = ['GLOBALEVENTID','day','MonthYear','Year','Actor1Code','Actor1Name',
                    'Actor1CountryCode','Actor1KnownGroupCode','Actor1EthnicCode','Actor1Religion1Code',
                    'Actor1Religion2Code','Actor2Code',
                    'Actor2Name', 'Actor2CountryCode', 'Actor2KnownGroupCode', 'Actor2EthnicCode',
                    'Actor2Religion1Code', 'Actor2Religion2Code',
                    'EventCode','QuadClass',
                    'GoldsteinScale', 'AvgTone', 
                    'Actor1Geo_FullName','Actor1Geo_Location',
                    'Actor2Geo_FullName','Actor2Geo_Location',
                    'ActionGeo_FullName', 'ActionGeo_location',
                    'SOURCEURL']
dataFilter = dataRead[['GLOBALEVENTID','day','Actor1CountryCode', 'Actor2CountryCode','EventCode','AvgTone','QuadClass','GoldsteinScale']]
#dataFilter = dataFilter.dropna()  # 去掉有空值的行
dataFilter = dataFilter.reset_index(drop=True) 


def calculate(datafil,dicFile):
    for indexs in datafil.index:
        Globaleventid = datafil.loc[indexs].values[0]
        date = datafil.loc[indexs].values[1]
        Actor1Country = datafil.loc[indexs].values[2]
        Actor2Country = datafil.loc[indexs].values[3]
        eventcode = datafil.loc[indexs].values[4]
        avgtone = datafil.loc[indexs].values[5]
        quadclass = datafil.loc[indexs].values[6]
        goldsteinscale = datafil.loc[indexs].values[7]
        #在此写指数计算过程
        attitude=""
        if abs(avgtone)<1:
            attitude="neutral"
        elif avgtone<-5:
            attitude="severely negative"
        elif avgtone<=-1:
            attitude="negative"
        elif avgtone<=5:
            attitude="positive"
        else:
            attitude="extremely positive"
        print(Globaleventid, ',', date,',', Actor1Country,',',Actor2Country,',',eventcode,',',avgtone,',',quadclass,',',goldsteinscale,',',attitude,',',file=dicFile)
        
dicfile = open(resultPath + 'ans' + '2.csv', 'w')
print('GlobaleventID', ',', 'day',',','Actor1Country',',','Actor2Country',',','eventcode',',','avgcode',',','quadclass',',','goldsteinscale',',','attitude',',', file=dicfile)
calculate(dataFilter,dicfile)
dicfile.close()