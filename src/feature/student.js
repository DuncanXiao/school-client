import faker from 'faker';

const student = {
  uuid: faker.random.uuid(),
  name: faker.name.firstName(),
  sex: '男',
  address1: faker.address.streetAddress(),
  address2: faker.address.streetAddress(),
  address3: faker.address.streetAddress(),
  phone1: faker.phone.phoneNumber(),
  phone2: faker.phone.phoneNumber(),
  phone3: faker.phone.phoneNumber(),
  cornetPhone1: faker.phone.phoneFormats(),
  cornetPhone2: faker.phone.phoneFormats(),
  cornetPhone3: faker.phone.phoneFormats(),
  headPhotoUrl: faker.image.imageUrl(),

  vouchers: [{
    storeId: faker.random.uuid(),
    name: faker.name.title(),
    condition: '满78元可用',
    logo: faker.image.imageUrl(),
    expiredDate: faker.date.future(),
    tip: faker.lorem.text(),
    money: '15',
    used: false
  }, {
    storeId: faker.random.uuid(),
    name: faker.name.title(),
    condition: '满78元可用',
    logo: faker.image.imageUrl(),
    expiredDate: faker.date.future(),
    tip: faker.lorem.text(),
    money: '20',
    used: false
  }],

  redPackets: [{
    money: '5',
    expiredDate: faker.date.future(),
    condition: '满78元可用',
    tip: faker.lorem.text(),
    used: false
  }, {
    money: '1',
    expiredDate: faker.date.future(),
    condition: '满78元可用',
    tip: faker.lorem.text(),
    used: false
  }]
};

export default student;