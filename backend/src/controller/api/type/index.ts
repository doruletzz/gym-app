export type JwtPayload = {
	user: string;
	role: 'admin' | 'member' | 'developer';
};
