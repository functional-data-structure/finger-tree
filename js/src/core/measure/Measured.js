
class Measured {

	constructor ( measure , element ) {
		this.element = element ;
		this.v = measure.measure( element ) ;
	}

}
