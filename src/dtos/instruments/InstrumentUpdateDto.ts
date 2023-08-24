export class InstrumentUpdateDto {
    public name: string = '';
    public description: string = '';
    public imagePath?: File;
    public pricePerDay: number = 0;
    public region: string = '';
    public district: string = '';
    public address: string = '';
    public status: 0 | 1 = 0;
    public phoneNumber: string = '';
}
