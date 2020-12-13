using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CGlab.Controllers
{
    public class ColorsSystemsController : Controller
    {
        // GET: ColorsSystems
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ColorModel1()
        {
            return View("ColorModel1");
        }
        public ActionResult ColorModel2()
        {
            return View("ColorModel2");
        }

        // GET: ColorsSystems/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ColorsSystems/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ColorsSystems/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ColorsSystems/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ColorsSystems/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ColorsSystems/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ColorsSystems/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
