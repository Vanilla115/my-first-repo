import { test, expect } from '@playwright/test';

test.describe('API-тесты для Restful-booker', () => {

  const baseURL = 'https://restful-booker.herokuapp.com';

  let bookingId;
  let token;
  const bookingData = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01'
    },
    additionalneeds: 'Breakfast'
  };


  test('Создание бронирования (POST)', async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: bookingData
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Создано:', body); // Консоль логи обычно не оставляют в тестах. Их нужно убрать.

    expect(body).toHaveProperty('bookingid');
    expect(body.booking.firstname).toBe(bookingData.firstname);

    bookingId = body.bookingid;
  });
  
 test('Получение информации о бронировании (GET)', async ({ request }) => {
    console.log(bookingId);
    const response = await request.get(`${baseURL}/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('Тело ответа:', responseBody);

    expect(responseBody.firstname).toBe(bookingData.firstname);
    expect(responseBody.lastname).toBe(bookingData.lastname);
  });

  test('Обновление бронирования (PUT)', async ({ request }) => {
    // 1. Получаем токен
    const authResp = await request.post(`${baseURL}/auth`, {
      data: { username: 'admin', password: 'password123' }
    });
    token = (await authResp.json()).token;
    const updatedBooking = {
    firstname: 'Jack',
    lastname: 'Brown',
    totalprice: 222,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01'
    },
    additionalneeds: 'Breakfast'
  };

    // 2. Новые данные
    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}` 
      },
      data: updatedBooking
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log('Обновлено:', body);

    expect(body.firstname).toBe('Jack');
    expect(body.totalprice).toBe(222);
  });

   test('Удаление бронирования (DELETE)', async ({ request }) => {
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` }
    });

    expect(response.status()).toBe(201);

    // Доп проверка: после удаления GET возвращает 404
    const check = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(check.status()).toBe(404);
  });
});
