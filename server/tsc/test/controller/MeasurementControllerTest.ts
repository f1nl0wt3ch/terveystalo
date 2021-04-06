import request from 'supertest'
const server = "http://localhost:3001"

describe('GET /api/v1/measurement/:id', () => {
    it('should return 200 & valid response if request param is a corrected id', async done => {
        request(server)
            .get(`/api/v1/measurement/1`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.over).toEqual(expect.any(Number))
                done()
            })
    })

    it('should return 401 and message is bad request', async done => {
        request(server)
            .get(`/api/v1/measurement/hello`)
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({msg: "Bad request!"})
                done()
            })
    })

    it('should return 404 & message is not found', async done => {
        request(server)
            .get(`/api/v1/measurement/10000000000`)
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({msg: "Not found!"})
                done()
            })
    })
})
