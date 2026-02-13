import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

jest.setTimeout(30000);

describe('Auth module', () => {
  let app: INestApplication;

  const testEmail = `customer${Date.now()}@gmail.com`;
  const testPassword = 'customer123';
  let accessToken: string;
  let refreshToken: string | undefined;

  let newAccessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Customer Testing',
        email: testEmail,
        password: testPassword,
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });

  type LoginResponse = {
    access_token: string;
    refresh_token: string;
  };

  type RenewResponse = {
    access_token: string;
  };

  const loginAndStoreTokens = async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testEmail, password: testPassword })
      .expect(201);

    const body = res.body as { data?: LoginResponse };
    accessToken = body.data?.access_token as string;
    refreshToken = body.data?.refresh_token;
  };

  it('login returns access and refresh tokens', async () => {
    await loginAndStoreTokens();

    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  it('renews access token using refresh token', async () => {
    if (!refreshToken) {
      await loginAndStoreTokens();
    }

    const res = await request(app.getHttpServer())
      .post('/auth/renew-token')
      .send({ refresh_token: refreshToken })
      .expect(201);

    const body = res.body as { data?: RenewResponse };

    expect(body.data?.access_token).toBeDefined();

    newAccessToken = body.data?.access_token as string;
  });

  it('cek auth with new access token', async () => {
    const res = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${newAccessToken}`)
      .expect(200);

    const body = res.body as { data?: unknown };

    expect(body.data).toBeDefined();
  });

  it('logs out with access token', async () => {
    if (!accessToken) {
      await loginAndStoreTokens();
    }

    const res = await request(app.getHttpServer())
      .get('/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const body = res.body as { message?: string };
    expect(body.message).toBeDefined();
  });

  it('reject with wrong password', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testEmail, password: 'WrongPass1' })
      .expect(400);

    const body = res.body as { message?: string };
    expect(body.message).toBeDefined();
  });

  it('rejects logout without token', async () => {
    const res = await request(app.getHttpServer())
      .get('/auth/logout')
      .expect(401);

    const body = res.body as { message?: string };
    expect(body.message).toBeDefined();
  });
});
