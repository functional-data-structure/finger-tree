'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Empty = Empty;

var _base = require('../base');

var _ = require('.');

var _core = require('../../0-core');

function Empty(M) {
	this.M = M;
	this.v = M.zero();
}

Empty.prototype = new _base.Tree();

Empty.prototype.measure = function () {
	return this.v;
};

Empty.prototype.empty = function () {
	return true;
};

Empty.prototype.head = function () {
	throw new Error("cannot call head on Empty");
};

Empty.prototype.last = function () {
	throw new Error("cannot call last on Empty");
};

Empty.prototype.tail = function () {
	return this;
};

Empty.prototype.init = function () {
	return this;
};

Empty.prototype.push = function (value) {
	return new _.Single(this.M, value);
};

Empty.prototype.cons = function (value) {
	return new _.Single(this.M, value);
};

Empty.prototype.concat = function (other) {
	return other;
};

Empty.prototype[Symbol.iterator] = function () {
	return _core._EMPTY;
};

/**
 * It is assumed that p(|this|) is true.
 */
Empty.prototype.splitTree = function (p, i) {
	throw new Error("splitTree not implemented in Empty");
};

Empty.prototype.split = function (p) {
	return [this, this];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy8zLXRyZWUvaW1wbGVtZW50YXRpb25zLzAtRW1wdHkuanMiXSwibmFtZXMiOlsiRW1wdHkiLCJNIiwidiIsInplcm8iLCJwcm90b3R5cGUiLCJtZWFzdXJlIiwiZW1wdHkiLCJoZWFkIiwiRXJyb3IiLCJsYXN0IiwidGFpbCIsImluaXQiLCJwdXNoIiwidmFsdWUiLCJjb25zIiwiY29uY2F0Iiwib3RoZXIiLCJTeW1ib2wiLCJpdGVyYXRvciIsInNwbGl0VHJlZSIsInAiLCJpIiwic3BsaXQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWdCQSxLLEdBQUFBLEs7O0FBSmhCOztBQUNBOztBQUNBOztBQUVPLFNBQVNBLEtBQVQsQ0FBaUJDLENBQWpCLEVBQXFCO0FBQzNCLE1BQUtBLENBQUwsR0FBU0EsQ0FBVDtBQUNBLE1BQUtDLENBQUwsR0FBU0QsRUFBRUUsSUFBRixFQUFUO0FBQ0E7O0FBRURILE1BQU1JLFNBQU4sR0FBa0IsZ0JBQWxCOztBQUVBSixNQUFNSSxTQUFOLENBQWdCQyxPQUFoQixHQUEwQixZQUFhO0FBQ3RDLFFBQU8sS0FBS0gsQ0FBWjtBQUNBLENBRkQ7O0FBSUFGLE1BQU1JLFNBQU4sQ0FBZ0JFLEtBQWhCLEdBQXdCLFlBQWE7QUFDcEMsUUFBTyxJQUFQO0FBQ0EsQ0FGRDs7QUFJQU4sTUFBTUksU0FBTixDQUFnQkcsSUFBaEIsR0FBdUIsWUFBYTtBQUNuQyxPQUFNLElBQUlDLEtBQUosQ0FBVywyQkFBWCxDQUFOO0FBQ0EsQ0FGRDs7QUFJQVIsTUFBTUksU0FBTixDQUFnQkssSUFBaEIsR0FBdUIsWUFBYTtBQUNuQyxPQUFNLElBQUlELEtBQUosQ0FBVywyQkFBWCxDQUFOO0FBQ0EsQ0FGRDs7QUFJQVIsTUFBTUksU0FBTixDQUFnQk0sSUFBaEIsR0FBdUIsWUFBYTtBQUNuQyxRQUFPLElBQVA7QUFDQSxDQUZEOztBQUlBVixNQUFNSSxTQUFOLENBQWdCTyxJQUFoQixHQUF1QixZQUFhO0FBQ25DLFFBQU8sSUFBUDtBQUNBLENBRkQ7O0FBSUFYLE1BQU1JLFNBQU4sQ0FBZ0JRLElBQWhCLEdBQXVCLFVBQVdDLEtBQVgsRUFBbUI7QUFDekMsUUFBTyxhQUFZLEtBQUtaLENBQWpCLEVBQXFCWSxLQUFyQixDQUFQO0FBQ0EsQ0FGRDs7QUFJQWIsTUFBTUksU0FBTixDQUFnQlUsSUFBaEIsR0FBdUIsVUFBV0QsS0FBWCxFQUFtQjtBQUN6QyxRQUFPLGFBQVksS0FBS1osQ0FBakIsRUFBcUJZLEtBQXJCLENBQVA7QUFDQSxDQUZEOztBQUlBYixNQUFNSSxTQUFOLENBQWdCVyxNQUFoQixHQUF5QixVQUFXQyxLQUFYLEVBQW1CO0FBQzNDLFFBQU9BLEtBQVA7QUFDQSxDQUZEOztBQUlBaEIsTUFBTUksU0FBTixDQUFnQmEsT0FBT0MsUUFBdkIsSUFBbUMsWUFBYTtBQUMvQztBQUNBLENBRkQ7O0FBSUE7OztBQUdBbEIsTUFBTUksU0FBTixDQUFnQmUsU0FBaEIsR0FBNEIsVUFBV0MsQ0FBWCxFQUFlQyxDQUFmLEVBQW1CO0FBQzlDLE9BQU0sSUFBSWIsS0FBSixDQUFXLG9DQUFYLENBQU47QUFDQSxDQUZEOztBQUlBUixNQUFNSSxTQUFOLENBQWdCa0IsS0FBaEIsR0FBd0IsVUFBV0YsQ0FBWCxFQUFlO0FBQ3RDLFFBQU8sQ0FBRSxJQUFGLEVBQVMsSUFBVCxDQUFQO0FBQ0EsQ0FGRCIsImZpbGUiOiIwLUVtcHR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZSB9IGZyb20gJy4uL2Jhc2UnIDtcbmltcG9ydCB7IFNpbmdsZSB9IGZyb20gJy4nIDtcbmltcG9ydCB7IF9FTVBUWSB9IGZyb20gJy4uLy4uLzAtY29yZScgO1xuXG5leHBvcnQgZnVuY3Rpb24gRW1wdHkgKCBNICkge1xuXHR0aGlzLk0gPSBNIDtcblx0dGhpcy52ID0gTS56ZXJvKCApIDtcbn1cblxuRW1wdHkucHJvdG90eXBlID0gbmV3IFRyZWUoICkgO1xuXG5FbXB0eS5wcm90b3R5cGUubWVhc3VyZSA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzLnYgO1xufSA7XG5cbkVtcHR5LnByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0cnVlIDtcbn0gO1xuXG5FbXB0eS5wcm90b3R5cGUuaGVhZCA9IGZ1bmN0aW9uICggKSB7XG5cdHRocm93IG5ldyBFcnJvciggXCJjYW5ub3QgY2FsbCBoZWFkIG9uIEVtcHR5XCIgKSA7XG59IDtcblxuRW1wdHkucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoICkge1xuXHR0aHJvdyBuZXcgRXJyb3IoIFwiY2Fubm90IGNhbGwgbGFzdCBvbiBFbXB0eVwiICkgO1xufSA7XG5cbkVtcHR5LnByb3RvdHlwZS50YWlsID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIHRoaXMgO1xufSA7XG5cbkVtcHR5LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIHRoaXMgO1xufSA7XG5cbkVtcHR5LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblx0cmV0dXJuIG5ldyBTaW5nbGUoIHRoaXMuTSAsIHZhbHVlICkgO1xufSA7XG5cbkVtcHR5LnByb3RvdHlwZS5jb25zID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblx0cmV0dXJuIG5ldyBTaW5nbGUoIHRoaXMuTSAsIHZhbHVlICkgO1xufSA7XG5cbkVtcHR5LnByb3RvdHlwZS5jb25jYXQgPSBmdW5jdGlvbiAoIG90aGVyICkge1xuXHRyZXR1cm4gb3RoZXIgO1xufSA7XG5cbkVtcHR5LnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCApIHtcblx0cmV0dXJuIF9FTVBUWSA7XG59IDtcblxuLyoqXG4gKiBJdCBpcyBhc3N1bWVkIHRoYXQgcCh8dGhpc3wpIGlzIHRydWUuXG4gKi9cbkVtcHR5LnByb3RvdHlwZS5zcGxpdFRyZWUgPSBmdW5jdGlvbiAoIHAgLCBpICkge1xuXHR0aHJvdyBuZXcgRXJyb3IoIFwic3BsaXRUcmVlIG5vdCBpbXBsZW1lbnRlZCBpbiBFbXB0eVwiICkgO1xufSA7XG5cbkVtcHR5LnByb3RvdHlwZS5zcGxpdCA9IGZ1bmN0aW9uICggcCApIHtcblx0cmV0dXJuIFsgdGhpcyAsIHRoaXMgXSA7XG59IDtcbiJdfQ==