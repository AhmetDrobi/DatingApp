namespace DatingApp.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50; // Set the max for page size in case the user tries to retrive 1million user at the same time
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; } // If the value is bigger than the max, set it as the max, othewise allow it
        }
        public int UserId { get; set; }
        public string Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 99;
        public string OrderBy { get; set; }
    }
}