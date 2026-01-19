# API 参考

MangoBot 提供了便捷的 API 来与 OneBot 客户端交互。

## OneBotApiService

`OneBotApiService` 是主要的服务接口。通常你不需要直接实例化它，可以通过 主项目 注入获取。

### 注入方式

```java
import io.github.mangomaner.mangobot.annotation.MangoBotApiService;

@MangoBotApiService
private OneBotApiService oneBotApiService;
```

## 发送消息

#### 发送私聊消息

```java
MessageId messageId = oneBotApiService.sendPrivateMsg(botId, userId, message);
```

参数说明：
- `botId` - 机器人 QQ 号
- `userId` - 对方 QQ 号
- `message` - 消息内容（支持 MessageBuilder 构建的 List&lt;MessageSegment&gt; 或字符串）

返回：`MessageId` 对象


#### 发送群消息

```java
MessageId messageId = oneBotApiService.sendGroupMsg(botId, groupId, message);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `message` - 消息内容

返回：`MessageId` 对象

 

## 群组管理

#### 获取群信息

```java
GroupInfo groupInfo = oneBotApiService.getGroupInfo(botId, groupId, noCache);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `noCache` - 是否不使用缓存

返回：`GroupInfo` 对象

#### 获取群成员信息

```java
GroupMemberInfo memberInfo = oneBotApiService.getGroupMemberInfo(botId, groupId, userId, noCache);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `userId` - 用户 QQ 号
- `noCache` - 是否不使用缓存

返回：`GroupMemberInfo` 对象

#### 获取群成员列表

```java
List&lt;GroupMemberInfo&gt; members = oneBotApiService.getGroupMemberList(botId, groupId);
```

返回：`List&lt;GroupMemberInfo&gt;` 对象

#### 获取群列表

```java
List&lt;GroupInfo&gt; groups = oneBotApiService.getGroupList(botId);
```

返回：`List&lt;GroupInfo&gt;` 对象

#### 获取群荣誉信息

```java
GroupHonorInfo honorInfo = oneBotApiService.getGroupHonorInfo(botId, groupId, type);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `type` - 荣誉类型

返回：`GroupHonorInfo` 对象

  

## 群组操作（需管理员权限）

#### 群组踢人

```java
oneBotApiService.setGroupKick(botId, groupId, userId, rejectAddRequest);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `userId` - 用户 QQ 号
- `rejectAddRequest` - 是否拒绝加群请求

#### 群组单人禁言

```java
oneBotApiService.setGroupBan(botId, groupId, userId, duration);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `userId` - 用户 QQ 号
- `duration` - 禁言时长（秒）

#### 群组全员禁言

```java
oneBotApiService.setGroupWholeBan(botId, groupId, enable);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `enable` - 是否启用全员禁言

#### 群组设置管理员

```java
oneBotApiService.setGroupAdmin(botId, groupId, userId, enable);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `userId` - 用户 QQ 号
- `enable` - 是否设置为管理员

#### 群组匿名

```java
oneBotApiService.setGroupAnonymous(botId, groupId, enable);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `enable` - 是否启用匿名

#### 设置群名片

```java
oneBotApiService.setGroupCard(botId, groupId, userId, card);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `userId` - 用户 QQ 号
- `card` - 群名片内容

#### 设置群名

```java
oneBotApiService.setGroupName(botId, groupId, groupName);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `groupName` - 新群名

#### 退出群组

```java
oneBotApiService.setGroupLeave(botId, groupId, isDismiss);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `isDismiss` - 是否解散群组

#### 设置群组专属头衔

```java
oneBotApiService.setGroupSpecialTitle(botId, groupId, userId, specialTitle, duration);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `userId` - 用户 QQ 号
- `specialTitle` - 专属头衔
- `duration` - 时长（秒）

  

## 用户信息

#### 获取登录号信息

```java
LoginInfo loginInfo = oneBotApiService.getLoginInfo(botId);
```

返回：`LoginInfo` 对象

#### 获取陌生人信息

```java
StrangerInfo strangerInfo = oneBotApiService.getStrangerInfo(botId, userId, noCache);
```

参数说明：
- `botId` - 机器人 QQ 号
- `userId` - 用户 QQ 号
- `noCache` - 是否不使用缓存

返回：`StrangerInfo` 对象

  

## 文件操作

#### 获取语音

```java
FileInfo fileInfo = oneBotApiService.getRecord(botId, file, outFormat);
```

参数说明：
- `botId` - 机器人 QQ 号
- `file` - 收到的语音文件名（消息段的 file 参数）
- `outFormat` - 要转换到的格式，目前支持 mp3、amr、wma、m4a、spx、ogg、wav、flac

返回：`FileInfo` 对象

#### 获取图片

```java
FileInfo fileInfo = oneBotApiService.getImage(botId, file);
```

参数说明：
- `botId` - 机器人 QQ 号
- `file` - 收到的图片文件名（消息段的 file 参数）

返回：`FileInfo` 对象

#### 检查是否可以发送图片

```java
CanSendInfo canSendInfo = oneBotApiService.canSendImage(botId);
```

返回：`CanSendInfo` 对象

#### 检查是否可以发送语音

```java
CanSendInfo canSendInfo = oneBotApiService.canSendRecord(botId);
```

返回：`CanSendInfo` 对象

  

### 转发消息

#### 发送群转发消息

```java
MessageId messageId = oneBotApiService.sendGroupForwardMsg(botId, groupId, messages);
```

参数说明：
- `botId` - 机器人 QQ 号
- `groupId` - 群号
- `messages` - 消息节点列表

返回：`MessageId` 对象

#### 发送私聊转发消息

```java
MessageId messageId = oneBotApiService.sendPrivateForwardMsg(botId, userId, messages);
```

参数说明：
- `botId` - 机器人 QQ 号
- `userId` - 用户 QQ 号
- `messages` - 消息节点列表

返回：`MessageId` 对象

#### 获取转发消息

```java
List&lt;GroupMessageEvent&gt; messages = oneBotApiService.getForwardMsg(botId, id);
```

参数说明：
- `botId` - 机器人 QQ 号
- `id` - 转发消息 ID

返回：`List&lt;GroupMessageEvent&gt;` 对象

[//]: # (## MessageBuilder)

[//]: # ()
[//]: # (`io.github.mangomaner.mangobot.onebot.MessageBuilder` 用于构建符合 OneBot 标准的消息链。)

[//]: # ()
[//]: # (### 基本用法)

[//]: # ()
[//]: # (```java)

[//]: # (import io.github.mangomaner.mangobot.onebot.MessageBuilder;)

[//]: # ()
[//]: # (// 构建消息)

[//]: # (SendMessage message = new MessageBuilder&#40;&#41;)

[//]: # (    .addText&#40;"Hello "&#41;)

[//]: # (    .addAt&#40;123456789L&#41;)

[//]: # (    .addText&#40;" check this out: "&#41;)

[//]: # (    .addImage&#40;"https://example.com/image.png"&#41;)

[//]: # (    .build&#40;&#41;;)

[//]: # ()
[//]: # (// 发送)

[//]: # (oneBotApiService.sendGroupMsg&#40;botId, groupId, message&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (### 支持的方法)

[//]: # ()
[//]: # (- `addText&#40;String text&#41;` - 添加文本)

[//]: # (- `addAt&#40;long userId&#41;` - 添加 @某人)

[//]: # (- `addImage&#40;String url&#41;` - 添加图片)

[//]: # (- `addFace&#40;int id&#41;` - 添加表情)

[//]: # (- `addReply&#40;int messageId&#41;` - 添加回复)

[//]: # ()
