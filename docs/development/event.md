# 事件系统

MangoBot 的核心是基于事件驱动的。了解事件系统对于开发插件至关重要。

## 事件类型

所有事件都继承自 `io.github.mangomaner.mangobot.model.onebot.event.Event` 类。主要的事件类型包括：

### 消息事件 (MessageEvent)

当机器人收到消息时触发。

#### GroupMessageEvent

群消息事件

**常用方法：**
- `getGroupId()` - 获取群号
- `getUserId()` - 获取消息发送者 QQ 号
- `getMessageId()` - 获取消息 ID
- `getParsedMessage()` - 获取解析后的自然语言消息
- `getSelfId()` - 获取机器人 QQ 号

#### PrivateMessageEvent

私聊消息事件

**常用方法：**
- `getUserId()` - 获取消息发送者 QQ 号
- `getMessageId()` - 获取消息 ID
- `getParsedMessage()` - 获取解析后的自然语言消息
- `getSelfId()` - 获取机器人 QQ 号

--- 

### 通知事件 (NoticeEvent)

当发生群成员变动、好友请求、戳一戳等系统通知时触发。

**包含的方法：**
- `getSelfId()` - 获取机器人 QQ 号
- `getTime()` - 获取事件时间
- `getPostType()` - 获取消息类型

**常见通知类型：**
- 群成员增加/减少
- 群管理员变动
- 好友请求
- 群禁言/解禁
- 戳一戳

## 事件处理流程

1. **接收**: WebSocket 接收到 OneBot 发来的 JSON 数据
2. **解析**: `EventParser` 根据 `post_type` 字段将 JSON 解析为对应的 `Event` 对象
3. **分发**: `MangoEventPublisher` 遍历所有注册的监听器
4. **执行**: 按照优先级顺序调用监听器方法
5. **反馈**: 监听器可以通过 API 服务向 OneBot 客户端发送响应

## 事件监听器

### @MangoBotEventListener

标记方法为事件监听器。

**参数规则：**
- 方法参数必须是 `Event` 的子类且非抽象类
- 只允许传入一个参数

**返回值：**
- `boolean`: 返回 `false` 将中断事件传播，后续优先级较低的监听器将不会收到该事件

**示例：**

```java
@MangoBotEventListener
public boolean handleMessage(MessageEvent event) {
    System.out.println("收到消息: " + event.getMessage());
    return true;  // 继续传播
}

@MangoBotEventListener
public boolean handleGroupMessage(GroupMessageEvent event) {
    System.out.println("收到群消息: " + event.getRawMessage());
    return false; // 中断事件传播
}
```

### @PluginPriority

控制监听器的执行顺序，数值越小优先级越高。

**！禁止传入小于0的优先级！**

**默认优先级：** 10

**示例：**

```java
@MangoBotEventListener
@PluginPriority(1) // 优先级最高，先执行
public void highPriority(MessageEvent event) {
    // 处理高优先级逻辑
}

@MangoBotEventListener
@PluginPriority(100) // 优先级较低，后执行
public void lowPriority(MessageEvent event) {
    // 处理低优先级逻辑
}
```

**优先级使用场景：**
- 1-10: 紧急处理，如权限检查、命令拦截
- 11-50: 常规业务逻辑
- 51-100: 日志记录、统计等辅助功能


## 最佳实践

1. **合理设置优先级**：避免所有插件都使用相同优先级导致执行顺序混乱
2. **快速返回**：监听器方法应快速执行，避免阻塞事件分发
3. **异常处理**：在监听器中添加适当的异常处理，避免影响其他插件
4. **事件中断**：谨慎使用返回 `false` 中断事件传播，确保不会意外阻止其他插件
5. **日志记录**：使用 Logger 记录关键操作和错误信息
