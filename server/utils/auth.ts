import jwt from 'jsonwebtoken'

export const generateTokens = (
    userId: string,
    tokenVersion: number,
    isAdmin: boolean = false
) => {
    const accessToken = jwt.sign(
        { userId, tokenVersion, isAdmin },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    )

    const refreshToken = jwt.sign(
        { userId, tokenVersion, isAdmin },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '10d' }
    )

    return { accessToken, refreshToken }
}