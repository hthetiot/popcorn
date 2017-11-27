"use strict";exports.unsafeString=/@cc|<\/?|script|\]\s*\]|<\s*!|&lt/i,exports.unsafeChars=/[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,exports.needEsc=/[\u0000-\u001f&<"\/\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,exports.needEscGlobal=/[\u0000-\u001f&<"\/\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,exports.starSlash=/\*\//,exports.identifier=/^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,exports.javascriptURL=/^(?:javascript|jscript|ecmascript|vbscript|livescript)\s*:/i,exports.fallsThrough=/^\s*falls?\sthrough\s*$/,exports.maxlenException=/^(?:(?:\/\/|\/\*|\*) ?)?[^ ]+$/;