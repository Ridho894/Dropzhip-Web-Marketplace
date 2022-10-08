import cx from 'classnames'

const Checkbox = ({ className, ...props }) => (
    <input
        {...props}
        type="checkbox"
        className={cx(
            'text-blue-900 focus:outline-2 focus:outline-blue-900 ring-0 focus:ring-0 focus:ring-offset-0 mr-2 rounded-md outline-none h-5 w-5 cursor-pointer',
            className,
        )}
    />
)

export default Checkbox
