# Smart Irrigation System

## Overview

The Smart Irrigation System is an innovative solution designed to automate and optimize the irrigation process in agriculture. By using IoT-based devices and smart sensors, the system ensures that crops receive the right amount of water at the right time, improving water efficiency and crop yields.

## Features

- **Automated Irrigation**: Automatically waters plants based on soil moisture levels.
- **Remote Monitoring**: Monitor the soil moisture levels, water usage, and system status remotely.
- **Weather Integration**: Uses weather data to adjust watering schedules.
- **Mobile App Integration**: A mobile app to control and monitor the system in real time.
- **Notifications**: Receive alerts for low water levels, system errors, and other critical events.
- **Energy Efficiency**: Optimized water usage reduces energy and water waste.

## Technologies Used

- **IoT Devices**: ESP32, soil moisture sensors, and water pumps.
- **Programming Languages**: C++, MERN
- **Database**: Firebase Realtime Database (for storing sensor data)
- **Sensors**: Soil moisture sensors, water flow sensors, temperature sensors.
- **Hardware**: Microcontrollers (ESP32), pumps, relays.

## System Architecture

The Smart Irrigation System consists of:
1. **IoT Devices**: These devices collect data from various sensors (e.g., soil moisture, temperature) and control irrigation actions like activating water pumps.
2. **Cloud Service**: The cloud server processes the data from the devices, stores it in the database, and communicates with the web app for real-time updates.

## Installation

### Prerequisites

- **Hardware Requirements**:
  - ESP32 microcontroller
  - Soil moisture sensor
  - Water pump
  - Relay module
  - Power supply

- **Software Requirements**:
  - Arduino IDE or PlatformIO

### Steps to Set Up

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/prashankulathunga/Smart-IRRIGATION.git

