package graduation.util

import java.math.RoundingMode
import java.text.DecimalFormat
import java.text.NumberFormat


class DecimalFormatConverter {

    static private final DECIMAL_PATTERN = "#.##########"

    static DecimalFormat decimalFormat

    static {
        decimalFormat = NumberFormat.getNumberInstance(Locale.ENGLISH) as DecimalFormat
        decimalFormat.applyPattern(DECIMAL_PATTERN)
        decimalFormat.setRoundingMode(RoundingMode.DOWN)
        decimalFormat.setMaximumFractionDigits(340)
    }


    static Double convert(Double value) {
        return decimalFormat.format(value).toDouble()
    }

}

