import jwt from 'jsonwebtoken'

export const generateTokens = (userId: string, tokenVersion: number) => {
    const accessToken = jwt.sign(
        { userId, tokenVersion },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' } // Changed from 15m to 7 days
    )

    const refreshToken = jwt.sign(
        { userId, tokenVersion },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '10d' } // Changed from 7d to 10 days
    )

    return { accessToken, refreshToken }
}