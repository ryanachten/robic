using System.Threading.Tasks;
using RobicServer.Data;
using RobicServer.Models;

namespace RobicServer.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IMongoRepository<User> _userRepo;

        public AuthRepository(IMongoRepository<User> userRepo)
        {
            _userRepo = userRepo;
        }
        public async Task<User> Login(string email, string password)
        {
            var user = await _userRepo.FindOneAsync(user => user.Email == email);
            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (passwordHash[i] != computedHash[i]) return false;
                }
                return true;
            }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;
            user.Exercises = new string[] { };

            await _userRepo.InsertOneAsync(user);

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string email)
        {
            User user = await _userRepo.FindOneAsync(user => user.Email == email);
            return user != null;
        }
    }
}