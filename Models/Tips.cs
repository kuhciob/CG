using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CGlab.Models
{
    static public class Tips
    {
        static public string wwwRootPath { get; set; }

        #region what is RGB
        static private string _whatIsRgb;
        static public string WhatIsRGB 
        { 
            get 
            {
                if (string.IsNullOrEmpty(_whatIsRgb))
                {
                    _whatIsRgb = HttpUtility.JavaScriptStringEncode(File.ReadAllText($"{wwwRootPath}/tips/WhatIsRGB.txt"));
                }
                return _whatIsRgb;
            } 
        }
        #endregion
        #region what is HSL
        static private string _whatIsHSL;
        static public string WhatIsHSL
        {
            get
            {
                if (string.IsNullOrEmpty(_whatIsHSL))
                {
                    _whatIsHSL = HttpUtility.JavaScriptStringEncode(File.ReadAllText($"{wwwRootPath}/tips/WhatIsHSL.txt"));
                }
                return _whatIsHSL;
            }
        }
        #endregion
        #region what is CMYK
        static private string _whatIsCMYK;
        static public string WhatIsCMYK
        {
            get
            {
                if (string.IsNullOrEmpty(_whatIsCMYK))
                {
                    _whatIsCMYK = HttpUtility.JavaScriptStringEncode(File.ReadAllText($"{wwwRootPath}/tips/WhatIsCMYK.txt"));
                }
                return _whatIsCMYK;
            }
        }
        #endregion
    }
}
