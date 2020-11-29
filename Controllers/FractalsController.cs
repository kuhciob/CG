using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CGlab.Models.Fractals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CGlab.Controllers
{
    public class FractalsController : Controller
    {
        // GET: FractalsController
        public ActionResult Index()
        {
            return View(new Flactal());
        }

        // GET: FractalsController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: FractalsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: FractalsController/Create
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

        // GET: FractalsController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: FractalsController/Edit/5
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

        // GET: FractalsController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: FractalsController/Delete/5
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
