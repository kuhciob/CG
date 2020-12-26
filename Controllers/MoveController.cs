﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CGlab.Controllers
{
    public class MoveController : Controller
    {
        // GET: MoveController
        public ActionResult Index()
        {
            return View();
        }

        // GET: MoveController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: MoveController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: MoveController/Create
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

        // GET: MoveController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: MoveController/Edit/5
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

        // GET: MoveController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: MoveController/Delete/5
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