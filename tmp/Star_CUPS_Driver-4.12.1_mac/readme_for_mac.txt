///////////////////////////////////////////////////////////////////////////

    - Star CUPS Driver Ver. 4.12.1 for mac -
        Readme File                                    01/11/2024

   (C) 2004 - 2024 Star Micronics Co., Ltd. All rights reserved.
///////////////////////////////////////////////////////////////////////////

* This ReadMe File applies to Star CUPS Driver Ver. 4.12.1 for mac
* This file provides supplementary information that is not described in other
  documentation.

  Thank you very much for purchasing Star Printer.

  Contents:

  1. About "Star CUPS Driver Ver. 4.12.1"
  2. Restrictions
  3. Cautions When printing via a USB interface
  4. How to send RAW Data to CUPS Printer
  5. TSP100IIU Vertical Compression Print and Back Feed Function Setting
  6. USB Serial Number Setting
  7. Release History

=======================================
 1.About "Star CUPS Driver Ver. 4.12.1"
=======================================
- Fixed a bug : Fail to reconnect Bluetooth after the OS reboot. 

===================
 2.Supported Models
===================
This Software supports the following Star Micronics Printer models:

- mC-Print2
- mC-Print3
- mPOP
- BSC10II
- TSP100IV
- TSP100IV SK
- TSP100IIILAN
- TSP100IIIW
- TSP100IIIBI
- TSP100IIIU
- TSP100IIU
- TSP650II
- TSP700II
- TSP800II
- mC-Label3
- SM-L200
- SM-L300
- SM-S210I
- SM-S230I
- SM-T300I
- SM-T400I
- SP700
- SK1-211/221
- SK1-311/321
- SK1-41
- SK5-31

================
 3.Restrictions
================
3-1 It may cause extremely slow printing or data lost when using CUPS drivers
    V3.4.0 or older with Mac OS X 10.9 (Mavericks).

3-2 Below is the restrictions for this version.
    Please read through and have well understanding before use.

 * SM-L300, SM-L304
   When printer turns off while USB connecting to PC, the printer queue is
   displayed as “Offline” even though the printer works.
   *Need restart the printer and PC to solve this happened.

3-3 Note for Upgrade Install
    Even if you perform an upgrade installation from the previous version,
    the function of the printer queue that has already created is still the old version.
    To upgrade the existing printer queue, please perform the following operation.

    1. Open the CUPS management screen.
    2. Select the Printer Queue.
    3. Select "Maintenance" - "Modify Printer".
    4. Select "Current Connection" and click "Continue".
    5. Click "Continue" without changing "Description" and "Location".
    6. Select the same "Model" from list. (Do not select "Current Driver - queue name".)

3-4 Limitations for Mac OS X 10.10 (USB models)
    If a USB printer is used with Mac OS X10.9.4 - 10.10,
    the printer queue is sometimes displayed as Off-line even though the printer can print
    when powering off the printer or restarting the PC.

    It can be prevented by allocating a USB serial number.
    Please use the "USB serial number allocation script" enclosed in the package
    to allocate a USB serial number to the printer.
    Please see the manual attached to the "USB serial number allocation script" for details.

==============================================
 4.Cautions When printing via a USB interface
==============================================
When printing via a USB interface on Mac OS X, the printing speed
will dramatically decrease or printing jobs may fail.

If this happens, use the script ("setup_for_mac.sh") in the
"Tips"-->"MSW_Setting" folder in the "starcupsdrv-X.X.X_mac.zip" (X.X.X
represents the driver version) in this driver package.
This will improve the problems described above.

Read the comments in the script for details on how it is used.

========================================
 5.How to send RAW Data to CUPS Printer
========================================
If you want to send RAW data file to Printer without any filtering,
you can use "-oraw" option of the "LPR" command.

Please refer to the following places for details.

"Tips"-->"HowToSendRawDataViaCUPS20060725.tar" folder
in the "starcupsdrv-X.X.X_mac.zip" (X.X.X represents the driver version)
in this driver package.

=======================================================================
 6.TSP100IIU Vertical Compression Print and Back Feed Function Setting
=======================================================================
* This setting applies to Star TSP100IIU.
Please refer to the following places for the Vertical Compression Print and Back Feed Function Setting.

Please execute the script("BackFeed_default.sh")in the "Tips"-->"TSP100IIU" folder in the
"starcupsdrv-X.X.X_linux.zip" (X.X.X represents the driver version)in this driver package.

The reduction print setting is 13 of the following.
  1.Back Feed default setting
  2.Back Feed 11mm setting
  3.Back Feed 10mm setting
  4.Back Feed  9mm setting
  5.Back Feed  8mm setting
  6.Back Feed  7mm setting
  7.Back Feed  6mm setting
  8.Back Feed  5mm setting
  9.Back Feed  4mm setting
 10.Back Feed  3mm setting
 11.Compression default setting
 12.Compression 75% setting
 13.Compression 50% setting

Read the comments in the script for details on how it is used.

=============================
 7.USB Serial Number Setting
=============================
Please refer to the following places for the USB Serial Number Setting.

Please execute the script("default.sh")in the "Tips"-->"USBSerialNumber" folder in the
"starcupsdrv-X.X.X_mac.zip" (X.X.X represents the driver version)in this driver package.

Read the "How to use.txt" in the script for details on how it is used.

===================
 8.Release History
===================
* Fri Nov 1 2024
- Version 4.12.1
- Fixed a bug : Fail to reconnect Bluetooth after the OS reboot. 

* Mon Jun 24 2024
- Version 4.12.0
- Added BSC10II
- The following Star Printers at End of Support.
  TSP113GT, TSP651

* Thu Feb 22 2024 
- Version 4.11.0
- Support Tear Off Cut with MCL32

* Fri Sep 8 2023
- Version 4.10.0
- Added support the following printer models.
  TSP100IV SK, SK1-41, SK1-41 Presenter, SK5-31 Presenter.

* Tue May 30 2023
- Version 4.9.1
- Fixed a bug : MCL32, Incorrect cut operation when using black mark paper or label paper.

* Fri Mar 31 2023
- Version 4.9.0
- Added mC-Label3
- Added new Bluetooth module information for SM-L200, SM-S210i, SM-S230i, SM-T300, SM-T300i and SM-T400i.
- The following Star Printers at End of Support.
   FVP10, SM-S220i

* Fri Oct 29  2021
- Version 4.8.0
- Added TSP100IV
- Removed Star Micronics Cloud Service function

* Wed Apr 22  2020
- Version 4.7.0
- Added print density +4 (mC-Print3 Series)
- MCP31C and MCP31CB (mC-Print3 Series) are supported

* Fri Jan 17  2020
- Version 4.6.1
- Supported macOS10.15

* Mon Dec 9  2019
- Version 4.6.0
- Added SK1 Printers

* Thu Jul 25 2019
- Version 4.5.0
- Added MCP30 Printer (mC-Print3 Series)

* Mon Nov 5 2018
- Version 4.4.0
- Added mC-Sound Function(MCP31)

* Thu Jun 15 2017
- Version 4.3.0
- Added MCP31, MCP21 and MCP20
- The following Star Printers at End of Support.
   SP500, TSP650, TSP828L, TSP1000, TUP500, TUP900, HSP7000

* Mon May 22 2017
- Version 4.2.0
- Added Micro Receipt function and SDK.
- Supported resizing of QR code.
- Bug Fix.

* Mon Apr 10 2017
- Version 4.1.0
- Added Models(SM-L300/SM-L304/POP10).

* Thu Oct 6 2016
- Version 4.0.0
- Release one package which contains both desktop printer driver and portable one.
- Add AllReceipts function support.
