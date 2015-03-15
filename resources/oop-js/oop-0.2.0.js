/**
 * Copyright 2014 momchil.me
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

oop = window.oop || {};

oop.createConstructorFunction = function() {
    return function() {};
};

oop.abstractMethod = function() {
    throw "Trying to call an abstract method.";
};

oop.namespace = function(name) {
    var currentObject = window;
    var segments = name.split(".");
    for (var i = 0; i < segments.length; ++i) {
        var segment = segments[i];
        currentObject[segment] = currentObject[segment] || {};
        currentObject = currentObject[segment];
    }
};

oop.baseClass = oop.createConstructorFunction();

oop.class = function(parentClass, definition) {
    // Would happen if we have not specified a parent
    if (definition === undefined) {
        return oop.class(oop.baseClass, parentClass);
    }

    var classFunction = definition.__create__;
    if (!classFunction) {
        classFunction = oop.createConstructorFunction();
    }

    // Copy all of the parent class' prototype methods into the new class
    $.extend(classFunction.prototype, parentClass.prototype);

    // Move all of the fields in the definition to the prototype
    $.extend(classFunction.prototype, definition);

    // Erase the internal '__create__' function.
    classFunction.__create__ = null;

    // Have a function that calls the parent's constructor.
    classFunction.prototype.__super__ = function() {
        parentClass.apply(this, arguments);
    };

    return classFunction;
};

oop.doesImplement = function(candidate, interfaceDefinition) {
    for (var methodName in interfaceDefinition) {
        var field = candidate[methodName];
        if (field === undefined) {
            return false;
        }
        if (typeof (field) !== "function") {
            return false;
        }
    }
    return true;
};

oop.interface = function(definition) {
    var interfaceFunction = oop.createConstructorFunction();

    var stubbedDefiniton = {};
    for (var methodName in definition) {
        stubbedDefiniton[methodName] = oop.abstractMethod;
    }
    $.extend(interfaceFunction, stubbedDefiniton);

    stubbedDefiniton = {};
    for (var methodName in definition) {
        stubbedDefiniton[methodName] = oop.abstractMethod;
    }
    $.extend(interfaceFunction.prototype, stubbedDefiniton);

    // Allow for isImplementedBy method calls on interfaces
    interfaceFunction.isImplementedBy = function(candidate) {
        return oop.doesImplement(candidate, definition);
    };

    return interfaceFunction;
};
