<img src="./myAssets/images/dimesCoverPhoto.png" align='center'/>

# Dimes

Dimes is a mobile app aimed at helping teach children the importance of money management. Users can connect to their childrens bank account to oversee spending and set budgets for them.

This app is aimed at a childs first bank account, to set them up for a future of sound money management.

## The way the app works..

* Parents create an account for themselves and their children and then connect to the childrens bank account.

* They can then set budgets for a set time period for whatever they like (lunch, shopping, app store etc.) and they can view what their child has spent and when, and will be alerted of any over spending.

* The parent gets 2 views, their own dashboard of all their children where they can see a detailed view of spending, a place where they can add budgets as well as seeing the childs view.

* For the child, they see a reduced view with account balance, what they've spent money on, what budgets have been set for them and how much left of budget they have.

* Children are incentivised by seeing what they will have left if they manage to save their remaining budgets after receiving an allowance.

## Getting Started 

* Except for the regular suspects; git, Node, npm, you need these things below to work on Dimes. Follow the instructions supplied below to get them up and running before you continue with Installation.

* Xcode (latest version, at least >9.3). Install from App Store.
* Cocoapods - a dependency manager for Swift and Objective-C Cocoa projects. 
```bash
sudo gem install cocoapods.
```

## Recommended 

React Native Debugger - a debugger built on the Chrome debugger, including React and Redux Dev Tools.

## Installation

* Clone this repo and enter the following in the command line
```bash
git clone https://github.com/chrisperry-sd/Dimes.git
cd kidsbudgetingapp
```
Install dependencies.
```bash
npm install
cd ios			# ! Change into the ios folder !
pod install
react-native run-ios
```
Run the **_dimes.xcworkspace_** file in Xcode.

Set up an Identity for the app under General in Xcode. You will need to pick a bundle name that will be unique to the particular certificate that you then have to generate under **Signing**

Build the app! (click the Play-button in the top left corner when you have picked your target in the drop-down to the right of it.)

## Tech Stack

* React native
* MongoDB
* Node
* Jest
* Express

## Developers

* Chris Perry [GitHub](https://github.com/chrisperry-sd) | [LinkedIn](https://www.linkedin.com/in/chrisdperry-sd/)
* Jill Masters [GitHub](https://github.com/jillmasters) | [LinkedIn](https://www.linkedin.com/in/jillianchuahmasters/)
* Stephen Matthews [GitHub](https://github.com/smatthews5) | [LinkedIn](https://www.linkedin.com/in/stephen-matthews5/)

## Stretch Goals

Connect to a bank account throught the [plaid Link](https://plaid.com/uk/).
