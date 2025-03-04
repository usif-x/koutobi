export default defineEventHandler((event) => {
    return {
        message: 'Rate limit test successful',
        timestamp: new Date().toISOString()
    }
})