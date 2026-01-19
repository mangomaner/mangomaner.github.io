# 消息构建

## 消息段

消息段是 OneBot 协议中消息的基本组成单位，包含文本、图片、表情、回复、视频、语音、文件等，详情参考 [OneBot 文档](https://283375.github.io/onebot_v11_vitepress/message/segment.html)。

在本项目中，消息段被封装为 `Segment` 类，位于 `io.github.mangomaner.mangobot.model.onebot.message.Segment` 中。

### 常见消息段类型

- **TextSegment** - 文本消息段
- **AtSegment** - @某人消息段
- **ImageSegment** - 图片消息段
- **FaceSegment** - 表情消息段
- **ReplySegment** - 回复消息段
- **VideoSegment** - 视频消息段
- **RecordSegment** - 语音消息段
- **FileSegment** - 文件消息段

## MessageBuilder

`MessageBuilder` 提供了便捷的方法来构建消息段列表。

**示例：**

```java
import io.github.mangomaner.mangobot.onebot.MessageBuilder;

// 构建包含文本、@、图片的消息
SendMessage message = new MessageBuilder()
    .addText("Hello ")
    .addAt(123456789L)
    .addText(" check this out: ")
    .addImage("https://example.com/image.png")
    .build();

// 发送
oneBotApiService.sendGroupMsg(botId, groupId, message);
```
