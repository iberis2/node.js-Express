'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Members', [
      {
        id: 1,
        name: 'John Doe',
        email: 'abc@example.com',
        team: 'engineering',
        position: 'Software Engineer',
        phoneNumber: '123-456-7890',
        birthday: '1990/01/01',
        admissionDate: '2019/04/01',
        profileImage: 'profile.png',
      },
      {
        id: 2,
        name: 'Jane Lee',
        email: 'cds@example.com',
        team: 'sales',
        position: 'Software Engineer',
        phoneNumber: '010-456-7890',
        birthday: '1990/08/01',
        admissionDate: '2020/01/20',
        profileImage: 'profile2.png',
      },
      {
        id: 3,
        name: 'John Smith',
        email: 'asdf@example.com',
        team: 'marketing',
        position: 'Server Developer',
        phoneNumber: '789-123-0291',
        birthday: '2000/11/03',
        admissionDate: '2020/07/14',
        profileImage: 'profile3.png',
      },
      {
        id: 4,
        name: 'July Smith',
        email: 'July@example.com',
        team: 'sales',
        position: 'Server Developer',
        phoneNumber: '010-456-7890',
        birthday: '1991/08/01',
        admissionDate: '2020/01/20',
        profileImage: 'profile4.png',
      },
      {
        id: 5,
        name: 'Jake Kim',
        email: 'Jake@example.com',
        team: 'engineering',
        position: 'Software Engineer',
        phoneNumber: '125-456-7890',
        birthday: '1992/05/05',
        admissionDate: '2019/04/01',
        profileImage: 'profile5.png',
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Members', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
