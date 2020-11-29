using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CGlab.Models.Fractals
{
    public class Flactal : PageModel
    {
        public List<string> FlactalTypes { get; set; }
        public List<string> Colors { get; set; }
        public int IterationCount { get; set; }
        public double Speed { get; set; }

        public Flactal()
        {
            FlactalTypes = new List<string>()
            {
                "Лінія коха(геометричний)",
                "\"Дракон\" Хартера-Хейтуея(геометричний)",
                "Лінія коха(IFS)",
                "\"Дракон\" Хартера-Хейтуея(IFS)",
                "Папороть Барнслі"
            };
            Colors = new List<string>()
            {
                "Червоний",
                "Синій",
                "Чорний"
            };
        }
    }
}
