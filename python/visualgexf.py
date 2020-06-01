# -*- coding:utf-8 -*-
import xml
import xml.etree.ElementTree as ET
import xml.dom.minidom as Dom
from xml.dom.minidom import parse
from xml.dom.minidom import parseString
import sys
import math
import random

# filename="data1.gexf"
# tree = ET.parse('data1.gexf')
# root = tree.getroot()
# child1=root.getiterator()
# child2=child1.getiterator()
# print(child2)
# graph=root.findall('graph')
# print(graph.items())
# nodes=graph[1].findall('nodes')
# AArry=nodes.findall('node')
# for element1 in root.findall('graph'):
#     for element2 in element1.findall('nodes'):
#         for element3 in element2.findall('node'):
# 	        tag = element3.tag #访问Element标签
# 	        attrib = element3.attrib #访问Element属性
# 	        text = element3.find('name').text #访问Element文本
# 	        print(tag, attrib, text)
ij=0
Time=20200110
# while ij<100:
#     Time+=1
filename1='../newgexf/'+str(Time)+'.gexf'
tree = parse(filename1)
type(tree)
datalist=tree.documentElement
# print(datalist.toxml())
# print(datalist.lastChild)

graph=datalist.getElementsByTagName('graph')[0]
nodes=graph.getElementsByTagName('nodes')[0]

 
# node=nodes.getElementsByTagName('node')[0]
# attvalues=node.getElementsByTagName('attvalues')[0]
# attvalue1=attvalues.getElementsByTagName('attvalue')[1]
# value1=attvalue1.getAttribute('value')
# size1=round(pow(float(value1),1/2))
# doc=Dom.Document()
# size=doc.createElement('viz:size')
# size.setAttribute('value',str(size1))
# node.appendChild(size)
# color=doc.createElement('viz:color')
# a=random.randint(0,255)
# b=random.randint(0,255)
# c=random.randint(0,255)
# color.setAttribute('r',str(a))
# color.setAttribute('g',str(b))
# color.setAttribute('b',str(c))
# node.appendChild(color)
# posi=doc.createElement('viz:position')
# posi.setAttribute('x',str(a))
# posi.setAttribute('y',str(b))
# posi.setAttribute('z',str(c))
# node.appendChild(posi)
nodelist=nodes.childNodes
print(nodelist.length)
nodenum=round((nodelist.length-1)/2)
print(nodenum)
for node in nodes.childNodes:
    if node.hasChildNodes():
        attvalues=node.getElementsByTagName('attvalues')[0]
        #print(node.toxml())
        attvalue1=attvalues.getElementsByTagName('attvalue')[1]
        value1=attvalue1.getAttribute('value')
        size1=round(pow(float(value1),1/2))
        doc=Dom.Document()
        size=doc.createElement('viz:size')
        size.setAttribute('value',str(size1))
        node.appendChild(size)
        color=doc.createElement('viz:color')
        a=random.randint(0,255)
        b=random.randint(0,255)
        c=random.randint(0,255)
        color.setAttribute('r',str(a))
        color.setAttribute('g',str(b))
        color.setAttribute('b',str(c))
        node.appendChild(color)
        posi=doc.createElement('viz:position')
        posi.setAttribute('x',str(a))
        posi.setAttribute('y',str(b))
        posi.setAttribute('z',str(c))
        node.appendChild(posi)
# print(attvalue1.toxml())
print(nodes.toxml())
# mid=0
# while mid<nodenum:
    
#     mid+=1

# print(value1)
# print(size1)
# graph=root.getElementsByTagName('graph')[0]
# nodes=graph.getElementsByTagName('nodes')[0]
# # for node in nodes.childNodes:
# #     if node.nodeType==node.ELEMENT_NODE and has_element_child(node)==0:
# doc=Dom.Document()
filename2='../newgexf/'+str(Time)+'gexf.gexf'
f = open(filename2, "w") 
tree.writexml(f,addindent='  ', newl='')
f.close()
# ij+=1