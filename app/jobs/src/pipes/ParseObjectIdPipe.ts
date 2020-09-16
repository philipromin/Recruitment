import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ObjectId } from 'mongodb'

export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {

    transform(value: any) {
        if(!ObjectId.isValid(value)) throw new BadRequestException(`${value} is not a valid ObjectId`)
        return value;
    }
}