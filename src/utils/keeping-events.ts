import { BaseEventOrig, CommonEvent } from "@tarojs/components";
/**
 * event 事件类，保持api的一致性
 */
export default class KeepingEvents {

    private e: CommonEvent;

    constructor(value: string | number, e?: CommonEvent) {
        this.createEvent(value, e);
    }

    private createEvent(value, e?: CommonEvent) {
        if (e) {
            this.e = e;
            return;
        }
        this.e = {
            detail: {
                value
            },
            type: '',
            timeStamp: 0,
            target: {
                tagName: '',
                id: '',
                dataset: {}
            },
            stopPropagation: function() {},
            preventDefault: function() {},
            currentTarget: {
                tagName: '',
                id: '',
                dataset: {}
            }
        };
    }

    getEvent() {
        return this.e;
    }

}