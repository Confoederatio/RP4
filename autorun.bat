@echo off
title Ampersand RP4
echo Ampersand auto-run is starting ...
:main
node main.js
echo Ampersand crashed! Restarting ...
goto main