import jwt from 'jsonwebtoken'

export const generateTokens = (
    userId: string,
    tokenVersion: number,
    isAdmin: boolean = false
) => {
    const accessToken = jwt.sign(
        { userId, tokenVersion, isAdmin },
        process.env.JWT_SECRET!,
        { expiresIn: '1m' }
    )

    const refreshToken = jwt.sign(
        { userId, tokenVersion, isAdmin },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '2m' }
    )

    return { accessToken, refreshToken }
}