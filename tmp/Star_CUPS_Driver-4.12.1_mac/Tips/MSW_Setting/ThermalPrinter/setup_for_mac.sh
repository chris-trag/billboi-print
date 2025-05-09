#!/bin/sh
#
# Memory Swtich Setting Script for TSP650/TSP700II under Mac OS X
# <Setting for Mac OS X>
#
# How to use:
#
# 1) Set TSP650, TSP700II as a Default printer
# 2) Copy this script (setup_for_mac.sh) and mac.dat into home folder.
# 3) Execute Termnal which is in the "Utilities" of "Applications",
#    then input "./setup_for_mac.sh" and return Enter key.
# 4) After execution, printer will print self test.
#    Please verify print result of <C> line in "-- Memory Switch --" part.
#    3rd digit of the <C> line should be set to "1".
#
#    Sample: 
#        <C> 0010000000000000 0200
#
lpr -o raw mac.dat
#
#
# Note:
# If you can not set SP650/TSP700II as a default printer, refer to the following
# procedure.
#
# 1) Using following command, printer queue lists, print queue names,
#    and default printer will be displayed.
#
#    $ lpstat -p -d
#
#    dispaly example:
#       star-no-power-mac-g4:~ star$ lpstat -p -d       
#       printer TSP654__STR_T_001_ is idle.  enabled since Jan 01 00:00
#       printer TSP743II__STR_T_001_ is idle.  enabled since Jan 01 00:00
#       system default destination: TSP743II__STR_T_001_
#
#    "TSP654__STR_T_001_" and "TSP743II_STR_T_001_" are printer queue name.
#
# 2) Use following commands to set the selected printer.
#    Input printer queue names into "Printer-queue name" according to "$ lpstat -p -d command".
#
#    $ lpr -o raw mac.dat -P "Printer-queue name"
#
#    Example
#       star-no-power-mac-g4:~ star$ lpr -o raw mac.dat -P TSP654__STR_T_001_
#
# 2008/03/27 Star Micronics co.,ltd.