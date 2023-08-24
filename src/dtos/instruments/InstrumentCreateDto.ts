export class InstrumentCreateDto {
    public name: string = '';
    public description: string = '';
    public imagePath: File | undefined;
    public pricePerDay: number = 0;
    public region: string = '';
    public district: string = '';
    public address: string = '';
    public status: 0 | 1 = 0;
    public phoneNumber: string = '';
}
