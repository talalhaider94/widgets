﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Services.DTOs.Widgets
{
    public class BaseWidgetDTO
    {
        public List<Measures> Measures { get; set; }
        public Tuple<DateTime,DateTime> DateRange { get; set; }
        public DateTime Date { get; set; }
        public List<int> KPIs { get; set; }
    }
}
