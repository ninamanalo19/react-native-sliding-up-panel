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

##METHOD(S)

Method  | Parameters | Method Description | Return Value | Optional or Required
------  | ---------- | ------------------ | ------------ | --------------------
getContainerHeight | containerHeight | Listening to latest final container height | containerHeight | Optional

##SAMPLE

Sample is in Test.js. There are two handler views that you can choose. For **HandlerOne**, it containers a simple image with a text inside it. For **HandlerTwo**, it containers a view with a touchable highlight (button) where you can put an event there.

**Three Major States of Sliding Up Panel**

HandlerOne handler view in Test.js

*Middle* <br>
 ![screen shot 2015-12-05 at 11 57 49 pm](https://cloud.githubusercontent.com/assets/8219419/11608772/e495b964-9bad-11e5-9cd0-a7f0ad08fc5f.png)<br>

*Down* <br>
 ![screen shot 2015-12-05 at 11 57 42 pm](https://cloud.githubusercontent.com/assets/8219419/11608770/e4923348-9bad-11e5-9fe5-4113cdda51bd.png)<br>

*Up* <br>
 ![screen shot 2015-12-05 at 11 57 55 pm](https://cloud.githubusercontent.com/assets/8219419/11608771/e493168c-9bad-11e5-870d-c9e1cc022a0d.png)<br>

 HandlerTwo handle view in Test.js

 *Middle* <br>
![screen shot 2015-12-05 at 11 58 38 pm](https://cloud.githubusercontent.com/assets/8219419/11608754/359cecde-9bad-11e5-95ce-9def7ddb7bfd.png)<br>

*Down* <br>
![screen shot 2015-12-05 at 11 58 35 pm](https://cloud.githubusercontent.com/assets/8219419/11608756/39ba0fea-9bad-11e5-8c95-8b99f06c74b4.png)<br>

*Event Triggered from Handler* <br>
![screen shot 2015-12-05 at 11 58 49 pm](https://cloud.githubusercontent.com/assets/8219419/11608755/35a0b4b8-9bad-11e5-832f-df40d715da2f.png)<br>
