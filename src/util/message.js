// 全局消息
export function Message(this, type, content, duration, closable) {
    let msDuration, msClosable;
    if (duration === null || duration === undefined || duration === '') {
        msDuration = 1.5
    } else {
        msDuration = duration
    }
    if (closable === null || closable === undefined || closable === '') {
        msClosable = false
    } else {
        msClosable = closable
    }
    this.$Message.destroy()
    this.$Message[type]({
        content,
        duration: msDuration,
        closable: msClosable,
    })
}