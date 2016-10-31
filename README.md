# react-native-sliding-up-panel

Inspired by [Android Sliding Panel](https://github.com/umano/AndroidSlidingUpPanel)

[![npm version](https://badge.fury.io/js/react-native-sliding-up-panel.svg)](https://badge.fury.io/js/react-native-sliding-up-panel)

```
npm install react-native-sliding-up-panel --save
```

##PROPERTIES

Property  | Type | Valid Values | Optional or Required
---------  | -----| ------------ | --------------------
containerMaximumHeight | Number | Any | Optional
containerOpacity | Number | 0 to 1 (e.g) 0.5 | Optional
containerBackgroundColor | String | Hex Colors or basic colors like 'black', 'yellow', etc. | Optional
handlerHeight | Number | Any | Optional
handlerOpacity | Number | 0 to 1 (e.g) 0.5| Optional
handlerBackgroundColor | String | Hex Colors or basic colors like 'black', 'yellow', etc. | Optional 
handlerDefaultView | React Class | Any React Class with a view | Required
allowStayMiddle | Boolean | true or false| Optional

##METHOD(S)

Method  | Parameters | Method Description | Return Value | Optional or Required
------  | ---------- | ------------------ | ------------ | --------------------
getContainerHeight | containerHeight | Listening to latest final container height | containerHeight | Optional

##SAMPLE

Sample is in Test.js. There are two handler views that you can choose. For **HandlerOne**, it containers a simple image with a text inside it. For **HandlerTwo**, it containers a view with a touchable highlight (button) where you can put an event there.

**GIF example of Sliding Up Panel**

![sliding-up-panel](https://cloud.githubusercontent.com/assets/16302770/19019840/e47781b6-88a5-11e6-8cd9-4115a27d4513.gif)<br>

