using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CamelRegistry;
using Xunit;

namespace CamelRegistry.Tests
{
    public class CamelValidationTests
    {
        private IList<ValidationResult> ValidateModel(object model)
        {
            var validationResults = new List<ValidationResult>();
            var ctx = new ValidationContext(model, null, null);
            Validator.TryValidateObject(model, ctx, validationResults, true);
            return validationResults;
        }

        [Fact]
        public void Camel_WithValidData_ShouldPassValidation()
        {
            var camel = new Camel 
            { 
                Name = "Guszti", 
                HumpCount = 2, 
                Color = "Barna", 
                LastFed = DateTime.Now 
            };

            var results = ValidateModel(camel);

            Assert.Empty(results);
        }

        [Fact]
        public void Camel_WithThreeHumps_ShouldFailValidation()
        {
            var camel = new Camel 
            { 
                Name = "Márta", 
                HumpCount = 3, 
                Color = "Fehér", 
                LastFed = DateTime.Now 
            };

            var results = ValidateModel(camel);

            Assert.Single(results);
            Assert.Contains(results, v => v.ErrorMessage.Contains("csak 1 vagy 2 lehet"));
        }

        [Fact]
        public void Camel_WithoutName_ShouldFailValidation()
        {
            var camel = new Camel 
            { 
                Name = null!,
                HumpCount = 1 
            };

            var results = ValidateModel(camel);

            Assert.NotEmpty(results);
            Assert.Contains(results, v => v.MemberNames.Contains("Name"));
        }
    }
}