namespace HowItWas.Web.Models
{
    using System;

    public class Utils
    {
        public static Random Random { get; } = new Random();

        public static string NewID => Guid.NewGuid().ToString();
    }
}