export class TransportUpdateDto {
    public name: string = '';
    public imagePath?: File;
    public pricePerHours: number = 0;
    public district: string = '';
    public region: string = '';
    public address: string = '';
    public status: 0 | 1 = 0;
    public phoneNumber: string = '';
    public description: string = '';
}
