import psycopg2
import datetime
import pandas as pd
import numpy as np
from numpy import nan as NaN

conn=psycopg2.connect(database="GdeltData",user="postgres",password="admin",host="127.0.0.1",port="5432")
print("success")
cur=conn.cursor()
sql_visualization_update="INSERT INTO public.visualization (globaleventid, day, monthyear, year, actor1code, actor1name, actor1countrycode, actor1knowngroupcode, actor1ethniccode, actor1religion1code, actor1religion2code, actor2code, actor2name, actor2countrycode, actor2knowngroupcode, actor2ethniccode, actor2religion1code, actor2religion2code, eventcode, quadclass, goldsteinscale, avgtone, actiongeo_fullname, actiongeo_location, actor1geo_fullname, actor1geo_location, actor2geo_fullname, actor2geo_location, sourceurl) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
sql_assessment_update="INSERT INTO public.assessment(globaleventid, quadclass, isrootevent, eventcode, eventbasecode, eventrootcode, goldsteinscale, nummentions, numsources, numarticles, avgtone, day, actor1code, actor2code, actor1countrycode, actor2countrycode, action_geolat, action_geolon, action_geoadm1code) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
sql_detail_update="INSERT INTO public.detail(globaleventid, actiongeo_fullname, actiongeo_location, actor1geo_fullname, actor1geo_location, actor2geo_fullname, actor2geo_location, quadclass, avgtone, goldsteinscale, sourceurl) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
sql_overview_update="INSERT INTO public.overview(globaleventid, day, monthyear, year, fractiondate, actor1code, actor1name, actor1countrycode, actor1knowngroupcode, actor1ethniccode, actor1religion1code, actor1religion2code, actor1type1code, actor1type2code, actor1type3code, actor2code, actor2name, actor2countrycode, actor2knowngroupcode, actor2ethniccode, actor2religion1code, actor2religion2code, actor2type1code, actor2type2code, actor2type3code, quadclass, actiongeo_fullname) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
sql_assessment_dailyupdate="INSERT INTO public.assessment_dailyupdate(globaleventid, quadclass, isrootevent, eventcode, eventbasecode, eventrootcode, goldsteinscale, nummentions, numsources, numarticles, avgtone, day, actor1code, actor2code, actor1countrycode, actor2countrycode, action_geolat, action_geolon, action_geoadm1code) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
sql_delate="truncate table public.assessment_dailyupdate"
updatetime=datetime.date(2020,5,13)
name=datetime.datetime.strftime(updatetime,'%Y%m%d')
update_info_visualization="COMMENT ON TABLE public.visualization IS 'updatetime:%s'" % (name)
update_info_detail="COMMENT ON TABLE public.detail IS 'updatetime:%s'" % (name)
update_info_assessment="COMMENT ON TABLE public.assessment IS 'updatetime:%s'" % (name)
update_info_overview="COMMENT ON TABLE public.overview IS 'updatetime:%s'" % (name)
update_info_assessment_dailyupdate="COMMENT ON TABLE public.assessment_dailyupdate IS 'updatetime:%s'" % (name)
def dailyUpdate(name):
    data=pd.read_csv('E:\\DATA\\GDELT\\daily\\'+name+'.CSV')
    data=data.fillna({'Actor1Geo_Lat':0,'Actor1Geo_Long':0,'Actor2Geo_Lat':0,'Actor2Geo_Long':0,'ActionGeo_Lat':0,'ActionGeo_Long':0,})
    results_visualization=[]
    results_detail=[]
    results_assessment=[]
    results_overview=[]
    cur.execute(sql_delate)
    for n in range(len(data['GlobalEventID'])):
        if data['GlobalEventID'][n]!=0:
            results_visualization.append((int(data['GlobalEventID'][n]),int(data['Day'][n]),int(data['MonthYear'][n]),int(data['Year'][n]),data['Actor1Code'][n],data['Actor1Name'][n],data['Actor1CountryCode'][n],data['Actor1KnownGroupCode'][n],data['Actor1EthnicCode'][n],data['Actor1Religion1Code'][n],data['Actor1Religion2Code'][n],data['Actor2Code'][n],data['Actor2Name'][n],data['Actor2CountryCode'][n],data['Actor2KnownGroupCode'][n],data['Actor2EthnicCode'][n],data['Actor2Religion1Code'][n],data['Actor2Religion2Code'][n],int(data['EventCode'][n]),int(data['QuadClass'][n]),float(data['GoldsteinScale'][n]),float(data['AvgTone'][n]),data['ActionGeo_Fullname'][n],'POINT('+str(data['ActionGeo_Long'][n])+' '+str(data['ActionGeo_Lat'][n])+')',data['Actor1Geo_Fullname'][n],'POINT('+str(data['Actor1Geo_Long'][n])+' '+str(data['Actor1Geo_Lat'][n])+')',data['Actor2Geo_Fullname'][n],'POINT('+str(data['Actor2Geo_Long'][n])+' '+str(data['Actor2Geo_Lat'][n])+')',data['SOURCEURL'][n]))
            results_detail.append((int(data['GlobalEventID'][n]),data['ActionGeo_Fullname'][n],'POINT('+str(data['ActionGeo_Long'][n])+' '+str(data['ActionGeo_Lat'][n])+')',data['Actor1Geo_Fullname'][n],'POINT('+str(data['Actor1Geo_Long'][n])+' '+str(data['Actor1Geo_Lat'][n])+')',data['Actor2Geo_Fullname'][n],'POINT('+str(data['Actor2Geo_Long'][n])+' '+str(data['Actor2Geo_Lat'][n])+')',int(data['QuadClass'][n]),float(data['AvgTone'][n]),float(data['GoldsteinScale'][n]),data['SOURCEURL'][n]))
            results_assessment.append((int(data['GlobalEventID'][n]),int(data['QuadClass'][n]),int(data['IsRootEvent'][n]),int(data['EventCode'][n]),int(data['EventBaseCode'][n]),int(data['EventRootCode'][n]),float(data['GoldsteinScale'][n]),int(data['NumMentions'][n]),int(data['NumSources'][n]),int(data['NumArticles'][n]),float(data['AvgTone'][n]),int(data['Day'][n]),data['Actor1Code'][n],data['Actor2Code'][n],data['Actor1CountryCode'][n],data['Actor2CountryCode'][n],float(data['ActionGeo_Lat'][n]),float(data['ActionGeo_Long'][n]),data['ActionGeo_ADM1Code'][n]))
            results_overview.append((int(data['GlobalEventID'][n]),int(data['Day'][n]),int(data['MonthYear'][n]),int(data['Year'][n]),float(data['FractionDate'][n]),data['Actor1Code'][n],data['Actor1Name'][n],data['Actor1CountryCode'][n],data['Actor1KnownGroupCode'][n],data['Actor1EthnicCode'][n],data['Actor1Religion1Code'][n],data['Actor1Religion2Code'][n],data['Actor1Type1Code'][n],data['Actor1Type2Code'][n],data['Actor1Type3Code'][n],data['Actor2Code'][n],data['Actor2Name'][n],data['Actor2CountryCode'][n],data['Actor2KnownGroupCode'][n],data['Actor2EthnicCode'][n],data['Actor2Religion1Code'][n],data['Actor2Religion2Code'][n],data['Actor2Type1Code'][n],data['Actor2Type2Code'][n],data['Actor2Type3Code'][n],int(data['QuadClass'][n]),data['ActionGeo_Fullname'][n]))
            print(n)
    cur.executemany(sql_visualization_update,results_visualization)
    cur.executemany(sql_detail_update,results_detail)
    cur.executemany(sql_assessment_update,results_assessment)
    cur.executemany(sql_overview_update,results_overview)
    cur.executemany(sql_assessment_dailyupdate,results_assessment)
    print(name+"success")
    cur.execute(update_info_visualization)
    cur.execute(update_info_detail)
    cur.execute(update_info_assessment)
    cur.execute(update_info_overview)
    cur.execute(update_info_assessment_dailyupdate)
dailyUpdate(name)
conn.commit()
