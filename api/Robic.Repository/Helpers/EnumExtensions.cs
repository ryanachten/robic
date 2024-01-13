namespace Robic.Repository.Helpers;

using System;
using System.ComponentModel;
using System.Reflection;

public static class EnumExtensions
{
    public static string? GetDescription(this Enum? value)
    {
        if (value == null) return null;

        var fieldInfo = value.GetType().GetField(value.ToString());
        if (fieldInfo == null) return null;

        var attribute = fieldInfo.GetCustomAttribute(typeof(DescriptionAttribute)) as DescriptionAttribute;
        return attribute?.Description;
    }
}