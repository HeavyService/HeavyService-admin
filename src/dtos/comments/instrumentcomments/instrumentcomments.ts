export class InstrumentCommentCreateDto {
    public replyId: number = 0;
    public comment: string = '';
    public isEdited: boolean = false;
    public instrumentId: Number = 0;


    constructor(replyId: number, comment: string, isEdited: boolean) {
        if (replyId === 1) {
            this.replyId = replyId;
        } else {
            throw new Error('Invalid replyId value.');
        }

        this.comment = comment;

        if (isEdited === true) {
            this.isEdited = isEdited;
        } else {
            throw new Error('Invalid isEdited value.');
        }
    }
}
