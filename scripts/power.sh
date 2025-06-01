#!/bin/bash
selection=$(echo -e "⏻ Power Off\n Reboot\n󰍃 Logout\n Lock" | rofi -dmenu) 

case $selection in
    "⏻ Power Off") systemctl poweroff ;;
    " Reboot") systemctl reboot ;;
    "󰍃 Logout") hyprctl dispatch exit ;;
    " Lock") swaylock ;;
esac

