﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Quantis.WorkFlow.Services.DTOs.API
{
    public class FormAdapterDTO
    {
        public int formID { get; set; }
        public int localID { get; set; }
        public List<FormFieldDTO> forms { get; set; }
    }
}
