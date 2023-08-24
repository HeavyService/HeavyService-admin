export class TransportCommentDto {
    public replyId: number = 0;
    public comment: string = '';
    public isEdited: boolean = false;
    public transportId: number = 0;

    constructor(replyId: number, isEdited: boolean) {
        if (replyId === 1) {
            this.replyId = replyId;
        } else {
            throw new Error('Invalid replyId value.');
        }
        if (isEdited === true) {
            this.isEdited = isEdited;
        } else {
            throw new Error('Invalid isEdited value.');
        }
    }
}
