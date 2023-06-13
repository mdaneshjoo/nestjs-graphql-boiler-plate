import User from '../entities/user.entity';

export type UserInterface = Omit<User, 'hashPassword'>;
